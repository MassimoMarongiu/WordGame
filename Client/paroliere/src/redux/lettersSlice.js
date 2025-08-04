import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  selectedLetters: []
};

export const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
     addMultipleLetters: (state, action) => {
      state.value = [...state.value, ...action.payload];
    },
    setLetters: (state, action) => {
      state.value = action.payload;
    },
    select: (state, action) => {
      const letter = state.value.find(l => l.id === action.payload);
      if (letter) {
        letter.selected = !letter.selected;
        if (letter.selected) {
          console.log("selected letter");
          state.selectedLetters.push(letter);
        } else {
          state.selectedLetters = state.selectedLetters.filter(
            l => l.id !== letter.id
          )
        }
      }
    },
    removeSelected: (state, action) => {
      state.selectedLetters = state.selectedLetters.filter(
        l => l.id !== action.payload
      );
      // Deseleziona anche la lettera nell'array value
      const letter = state.value.find(l => l.id === action.payload);
      if (letter) {
        letter.selected = false;
      }
    },
    resetLetters: (state) => {
      state.value = [];
      state.selectedLetters = [];
    },
    resetAllSelectedLetters: (state) => {
      state.value.forEach(l => {
        l.selected = false;
      })
      state.selectedLetters = [];
    }
  }
});

export const { add,addMultipleLetters, setLetters, select, removeSelected, resetLetters,resetAllSelectedLetters } = lettersSlice.actions;
const letterReducer = lettersSlice.reducer;
// const myLettersReducer = lettersSlice.reducer;
export default letterReducer;