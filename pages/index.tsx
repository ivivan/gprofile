import type { NextPage } from "next";
import getConfig from 'next/config';
import Layout from '@/components/Layout';
import Header from "../components/Header";
import DropDown from "../components/DropDown";
import Head from "next/head";
import Image from "next/image";
import { SetStateAction, useRef, useState, useEffect } from "react";
import LoadingDots from "../components/LoadingDots";
import { Toaster, toast } from "react-hot-toast";
import Footer from "@/components/Footer";

const { publicRuntimeConfig } = getConfig();

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState<string>("");
  const [vibe, setVibe] = useState<string>("Professional");
  const [generatedProfile, setGeneratedProfile] = useState<string>("");


  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  let vibePrompt = "";

  function checkVibe(vibe: string) {

    if (vibe === "Professional") {
      vibePrompt = "Make the profile sound professional and concise."
    } else if (vibe === "Funny") {
      vibePrompt = "Make the profile funny with icons and a little ridiculous. Organize in lists."
    } else if (vibe === "Rap King") {
      vibePrompt = "Make the profile sound like a rap. Follow the styles of the following rappers: Eminem, Lil Wayne, Drake, Kendrick Lamar, J. Cole, Kanye West, Jay Chou."
    }
    return vibePrompt;
  }

  vibePrompt = checkVibe(vibe);

  const prompt = `Generate 1 user profile with no links and tags. Less than 120 characters. The profile should include the following sections: About Me, Skills.
  Must only return the profile itself and in user's language. ${vibePrompt} Generate the profile based on these information: ${bio}${bio.slice(-1) === "." ? "" : "."}`;

  const generateProfile = async (e: any) => {
    e.preventDefault();
    setGeneratedProfile("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedProfile((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <section className="py-12">
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <Header />
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-10">
          <h1 className="sm:text-3xl text-2xl max-w-[708px] font-bold text-slate-900">
            Customize your GitHub profile using chatGPT
          </h1>
          <div className="max-w-xl w-full">
            <div className="flex mt-10 items-center space-x-3">
              <Image
                src="/one.png"
                width={30}
                height={30}
                alt="1 icon"
                className="mb-5 sm:mb-0"
              />
              <p className="text-left font-medium">
                Copy your current profile{" "}
                <span className="text-slate-500">
                  (or write a few sentences about yourself)
                </span>
              </p>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder={
                "e.g. Data Scientist, PhD, Live in OZ, Movie Lover, Cat Person."
              }
            />
            <div className="flex mb-5 items-center space-x-3">
              <Image src="/two.png" width={30} height={30} alt="1 icon" />
              <p className="text-left font-medium">Select your vibe.</p>
            </div>

            <div className="block my-5">
              <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
            </div>

            <div className="flex items-center space-x-3">
              <p>{prompt}</p>
            </div>


            {!loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                onClick={(e) => generateProfile(e)}
              >
                Generate your profile &rarr;
              </button>
            )}
            {loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
          </div>

          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 2000 }}
          />
          <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
          <div className="space-y-10 my-10">
            {generatedProfile && (
              <>
                <div>
                  <h2
                    className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                    ref={bioRef}
                  >
                    Your generated profile
                  </h2>
                </div>
                <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">

                  <div
                    className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedProfile);
                      toast("Bio copied to clipboard", {
                        icon: "✂️",
                      });
                    }}
                    key={generatedProfile}
                  >
                    <p>{generatedProfile}</p>
                  </div>

                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </section>
  );
};

export default Home;
