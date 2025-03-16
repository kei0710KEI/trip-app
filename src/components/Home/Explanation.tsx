import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Answer Simple Questions",
    icon: "❓",
    description: "Tell us where, when, who and budget for your Japan trip",
    detailedDescription:
      "Simply answer questions about your destination, duration, companions and budget. We'll use this to create your perfect Japan itinerary.",
  },
  {
    id: 2,
    title: "Get AI Generated Itinerary",
    icon: "✨",
    description: "Receive personalized travel plan in 10 seconds",
    detailedDescription:
      "Our AI will generate a detailed itinerary tailored to your preferences in about 10 seconds. Each plan generation costs 10 tokens.",
  },
  {
    id: 3,
    title: "Manage Your Tokens",
    icon: "🎫",
    description: "Get 50 free tokens on signup, buy more as needed",
    detailedDescription: (
      <>
        New users receive 50 tokens upon registration. Check your token balance
        and purchase more tokens{" "}
        <Link href="/token-shop" className="text-blue-600 hover:underline">
          here
        </Link>{" "}
        when needed.
      </>
    ),
  },
];

const Explanation = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const handleStepClick = (stepId: number) => {
    setSelectedStep(stepId);
  };

  const handleDialogClose = () => {
    setSelectedStep(null);
  };

  const handleNextStep = () => {
    if (selectedStep && selectedStep < steps.length) {
      setSelectedStep(selectedStep + 1);
    } else {
      setSelectedStep(null);
    }
  };

  const selectedStepData = steps.find((step) => step.id === selectedStep);

  return (
    <section className="py-8 sm:py-12 px-4 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
        How to use
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: step.id * 0.2 }}
            className="text-center p-6 cursor-pointer hover:bg-white hover:shadow-lg rounded-xl transition-all"
            onClick={() => handleStepClick(step.id)}
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <Dialog open={selectedStep !== null} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[525px] bg-gradient-to-br from-white to-gray-50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold pb-4 border-b">
              <span className="text-3xl">{selectedStepData?.icon}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Step {selectedStepData?.id}: {selectedStepData?.title}
              </span>
            </DialogTitle>
            <DialogDescription className="pt-6 text-base leading-relaxed text-gray-700">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                {selectedStepData?.detailedDescription}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {selectedStep === steps.length ? "Got it" : "Next"}
                </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Explanation;
