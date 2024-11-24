'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Coffee, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { questions, Question } from '../lib/questions';

const TOTAL_QUESTIONS = 25;
const SWIPE_THRESHOLD = 100;

const categoryColors: Record<Question['category'], string> = {
  fun: 'bg-yellow-50',
  romantic: 'bg-pink-50',
  deep: 'bg-blue-50',
  practical: 'bg-purple-50'
};

const Tutorial = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-white"
    >
      <div className="space-y-8 max-w-md w-full">
        <h1 className="text-4xl font-light text-center flex items-center justify-center gap-2">
          <Coffee className="w-8 h-8" />
          Latte Nights
          <Heart className="w-8 h-8 text-pink-500" />
        </h1>
        
        <div className="w-48 mx-auto space-y-4 text-lg font-light">
          <p className="flex items-center gap-3">
            <span className="text-xl">⬆️</span>
            <span>Agree</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="text-xl">⬇️</span>
            <span>Disagree</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="text-xl">⬅️</span>
            <span>Skip</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="text-xl">➡️</span>
            <span>Previous</span>
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={onStart}
            className="w-0.75 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-light hover:opacity-90 transition-opacity"
          >
            Let&apos;s Play
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const GameCard = ({ question, onSwipe }: { 
  question: Question, 
  onSwipe: (direction: string) => void 
}) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={(event, { offset }) => {
        const swipe = Math.abs(offset.x) > SWIPE_THRESHOLD ? (offset.x > 0 ? 'right' : 'left') :
                     Math.abs(offset.y) > SWIPE_THRESHOLD ? (offset.y > 0 ? 'down' : 'up') : null;
        if (swipe) onSwipe(swipe);
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`${categoryColors[question.category]} min-h-screen w-full fixed inset-0 flex items-center justify-center p-6`}
    >
      <p className="text-2xl font-light text-center max-w-md">{question.text}</p>
    </motion.div>
  );
};

interface Scores {
  agree: number;
  disagree: number;
  skip: number;
  categories: Record<Question['category'], number>;
}


  
const ScoreCard = ({ scores, onPlayAgain }: { 
    scores: Scores, 
    onPlayAgain: () => void 
  }) => {
    const totalResponses = scores.agree + scores.disagree + scores.skip;
    
    const handleShare = useCallback(async () => {
      const shareText = `Just played Latte Nights!
  
  Agreements: ${((scores.agree / totalResponses) * 100).toFixed(1)}%
  Disagreements: ${((scores.disagree / totalResponses) * 100).toFixed(1)}%
  Skipped: ${((scores.skip / totalResponses) * 100).toFixed(1)}%`;
  
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Latte Nights Results',
            text: shareText
          });
        } else {
          await navigator.clipboard.writeText(shareText);
          alert('Results copied to clipboard!');
        }
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }, [scores, totalResponses]);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gray-50 p-6"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <p className="text-gray-500 font-light">Here&apos;s how you both matched up!</p>
          </div>
  
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-sm font-light text-gray-500 mb-1">Agreements</h4>
                <p className="text-2xl font-light text-green-500">
                  {((scores.agree / totalResponses) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-sm font-light text-gray-500 mb-1">Disagreements</h4>
                <p className="text-2xl font-light text-red-500">
                  {((scores.disagree / totalResponses) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-sm font-light text-gray-500 mb-1">Skipped</h4>
                <p className="text-2xl font-light text-gray-500">
                  {((scores.skip / totalResponses) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>
  
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-light mb-4">Category Breakdown</h3>
              {Object.entries(scores.categories).map(([category, count]) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm font-light">
                    <span className="capitalize">{category}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${categoryColors[category as keyof typeof categoryColors]} transition-all duration-500`}
                      style={{ width: `${(count / totalResponses) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
  
          <div className="flex gap-4">
            <button
              onClick={onPlayAgain}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-light hover:opacity-90 transition-opacity"
            >
              Play Again
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-light hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </motion.div>
    );
  };
  
  const LatteNights = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
    const [scores, setScores] = useState<Scores>({
      agree: 0,
      disagree: 0,
      skip: 0,
      categories: {
        fun: 0,
        romantic: 0,
        deep: 0,
        practical: 0
      }
    });
  
    const [shuffledQuestions] = useState(() => 
      [...questions].sort(() => Math.random() - 0.5)
    );
  
    const currentQuestion = useMemo(() => 
      shuffledQuestions[currentQuestionIndex] || shuffledQuestions[0],
      [shuffledQuestions, currentQuestionIndex]
    );
  
    const isGameOver = answeredQuestions.length >= TOTAL_QUESTIONS;
  
    const handleSwipe = useCallback((direction: string) => {
      if (!currentQuestion) return;
  
      setScores(prevScores => {
        const scoreUpdate = { ...prevScores };
        
        if (direction === 'up') scoreUpdate.agree++;
        else if (direction === 'down') scoreUpdate.disagree++;
        else if (direction === 'left') scoreUpdate.skip++;
        
        if (direction !== 'right') {
          const category = currentQuestion.category;
          scoreUpdate.categories[category]++;
        }
        
        return scoreUpdate;
      });
  
      if (direction !== 'right') {
        setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
      }
      
      setCurrentQuestionIndex(prev => 
        direction === 'right' && prev > 0 ? prev - 1 : 
        direction !== 'right' ? prev + 1 : prev
      );
    }, [currentQuestion]);
  
    const handlePlayAgain = useCallback(() => {
      setGameStarted(true);
      setCurrentQuestionIndex(0);
      setAnsweredQuestions([]);
      setScores({
        agree: 0,
        disagree: 0,
        skip: 0,
        categories: {
          fun: 0,
          romantic: 0,
          deep: 0,
          practical: 0
        }
      });
    }, []);
  
    if (!gameStarted) {
      return <Tutorial onStart={() => setGameStarted(true)} />;
    }
  
    if (isGameOver) {
      return <ScoreCard scores={scores} onPlayAgain={handlePlayAgain} />;
    }
  
    if (!currentQuestion) {
      return null;
    }
  
    return (
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          <GameCard
            key={`${currentQuestion.id}-${currentQuestionIndex}`}
            question={currentQuestion}
            onSwipe={handleSwipe}
          />
        </AnimatePresence>
      </div>
    );
  };
  
  export default LatteNights;