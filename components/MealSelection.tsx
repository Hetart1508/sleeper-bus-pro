
import React from 'react';
import { MEALS } from '../constants';

interface MealSelectionProps {
  selectedMeals: { [id: string]: number };
  onMealChange: (mealId: string, delta: number) => void;
}

const MealSelection: React.FC<MealSelectionProps> = ({ selectedMeals, onMealChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEALS.map((meal) => (
          <div key={meal.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 transition-transform hover:scale-[1.02]">
            <img src={meal.image} alt={meal.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900">{meal.name}</h3>
                <span className="text-indigo-600 font-bold">₹{meal.price}</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">{meal.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onMealChange(meal.id, -1)}
                    className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                  >
                    -
                  </button>
                  <span className="font-bold w-4 text-center">{selectedMeals[meal.id] || 0}</span>
                  <button
                    onClick={() => onMealChange(meal.id, 1)}
                    className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {Object.keys(selectedMeals).length === 0 && (
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center">
          <p className="text-indigo-700 text-sm">No meals selected. You can skip this or add some to your journey!</p>
        </div>
      )}
    </div>
  );
};

export default MealSelection;
