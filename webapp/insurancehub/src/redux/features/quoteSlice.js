import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {},
  quotes: {},
  selectedquote: {},
  recommended: "",
  formType: "",
};

export const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.form = action.payload;
    },
    setQuotesData: (state, action) => {
      state.quotes = action.payload;
    },
    setSelectedQuote: (state, action) => {
      state.selectedquote = action.payload;
    },
    setRecommended: (state, action) => {
      state.recommended = action.payload;
    },
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
    getQuote: (state) => {
      return state;
    },
    resetQuote: (state) => {
      state.form = {};
      state.quotes = {};
      state.selectedquote = {};
      state.recommended = "";
      state.formType = "";
    },
  },
});

export const {
  setFormData,
  setQuotesData,
  setSelectedQuote,
  setRecommended,
  getQuote,
  resetQuote,
  setFormType,
} = quoteSlice.actions;
export default quoteSlice.reducer;
