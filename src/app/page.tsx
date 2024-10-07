"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plane,
  Github,
  Twitter,
  Linkedin,
  Loader2,
  Sun,
  Cloud,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [itinerary, setItinerary] = useState<string[][]>([]);
  const [displayedItinerary, setDisplayedItinerary] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setItinerary([]);
    setDisplayedItinerary([]);

    // Simulating API call to get itinerary
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const fakeItinerary = [
      [
        `Morning: Arrive in ${destination} and check into your hotel. Take a leisurely walk around the neighborhood to get your bearings.`,
        `Afternoon: Visit a local cafe for lunch and people-watching. Explore nearby shops and attractions.`,
        `Evening: Enjoy a welcome dinner at a popular restaurant, sampling local cuisine.`,
      ],
      [
        `Morning: Start with a guided walking tour of ${destination}'s historic center, learning about its rich history and culture.`,
        `Afternoon: Visit the main museum or art gallery, immersing yourself in local art and artifacts.`,
        `Evening: Attend a cultural performance or show, experiencing the city's vibrant arts scene.`,
      ],
      [
        `Morning: Embark on a day trip to a nearby natural wonder or historical site, departing early to make the most of your day.`,
        `Afternoon: Explore the site, taking in its beauty and significance. Enjoy a picnic lunch in scenic surroundings.`,
        `Evening: Return to ${destination} for a relaxing dinner and perhaps a nightcap at a rooftop bar with city views.`,
      ],
      [
        `Morning: Start your day with a local breakfast specialty, then head out for some souvenir shopping in the city's best markets.`,
        `Afternoon: Relax in a city park or take an optional excursion based on your interests (e.g., cooking class, wine tasting).`,
        `Evening: Indulge in a farewell dinner at a top-rated restaurant, reflecting on your trip highlights.`,
      ],
      [
        `Morning: Take a final stroll through your favorite neighborhood, soaking in the atmosphere one last time.`,
        `Afternoon: Finish any last-minute shopping or sightseeing. Prepare for departure and head to the airport.`,
        `Evening: Depart ${destination} with wonderful memories of your trip, already planning your next adventure!`,
      ],
    ];
    setItinerary(fakeItinerary);
    setIsLoading(false);
    setIsGenerating(true);
  };

  useEffect(() => {
    if (isGenerating && itinerary.length > displayedItinerary.length) {
      const timer = setTimeout(() => {
        setDisplayedItinerary((prev) => [...prev, itinerary[prev.length]]);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (itinerary.length === displayedItinerary.length) {
      setIsGenerating(false);
    }
  }, [itinerary, displayedItinerary, isGenerating]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center">
          <Plane className="mr-2 h-6 w-6" />
          <span className="font-bold text-lg">AI Trip Planner</span>
        </div>
      </header>

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4">
          <section className="relative overflow-hidden py-24 sm:py-32">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-yellow-500 opacity-30 animate-pulse" />
              <div className="absolute top-10 left-0 w-20 h-px bg-gradient-to-r from-transparent via-white to-transparent animate-[shooting-star_2s_linear_infinite]">
                <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-white shadow-[0_0_2px_2px_rgba(255,255,255,0.5)]"></div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
                  Where will AI take you?
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="flex gap-4 max-w-md mx-auto"
                >
                  <Input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={isLoading || isGenerating}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Planning...
                      </>
                    ) : (
                      "GO"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </section>

          <AnimatePresence>
            {displayedItinerary.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mx-auto px-4 py-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Your {destination} Itinerary
                </h2>
                <div className="space-y-4">
                  {displayedItinerary.map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-muted p-4 rounded-lg shadow-md"
                    >
                      <div className="flex items-start">
                        <div className="bg-primary text-primary-foreground rounded-full p-2 mr-4">
                          <Plane className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">
                            Day {index + 1}
                          </h3>
                          <div className="space-y-2">
                            {day.map((routine, routineIndex) => (
                              <motion.p
                                key={routineIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: routineIndex * 0.5 }}
                                className="text-muted-foreground"
                              >
                                <span className="font-medium mr-2">
                                  {routineIndex === 0 && (
                                    <Sun className="inline-block mr-1 h-4 w-4" />
                                  )}
                                  {routineIndex === 1 && (
                                    <Cloud className="inline-block mr-1 h-4 w-4" />
                                  )}
                                  {routineIndex === 2 && (
                                    <Moon className="inline-block mr-1 h-4 w-4" />
                                  )}
                                </span>
                                {routine}
                              </motion.p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {isGenerating && (
            <div className="mx-auto px-4 py-8 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {isLoading && (
            <div className="mx-auto px-4 py-8 space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-muted p-4 rounded-lg shadow-md animate-pulse"
                >
                  <div className="flex items-start">
                    <div className="bg-primary/20 rounded-full p-2 mr-4 w-10 h-10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-primary/20 rounded w-1/4" />
                      <div className="space-y-2">
                        <div className="h-3 bg-primary/20 rounded" />
                        <div className="h-3 bg-primary/20 rounded" />
                        <div className="h-3 bg-primary/20 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-muted mt-auto">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">About Us</h3>
              <p className="text-muted-foreground">
                AI Trip Planner uses cutting-edge AI to help you plan your
                perfect trip.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/10 text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} AI Trip Planner. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
