import React, { createContext, useState } from 'react';

interface FontSizeContextProps {
  fontSize: number;
  increaseFont: () => void;
  decreaseFont: () => void;
}

export const FontSizeContext = createContext<FontSizeContextProps>({
  fontSize: 14,
  increaseFont: () => {},
  decreaseFont: () => {},
});

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<number>(14);

  const increaseFont = () => setFontSize((prev) => prev + 2);
  const decreaseFont = () => setFontSize((prev) => (prev > 10 ? prev - 2 : prev));

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFont, decreaseFont }}>
      {children}
    </FontSizeContext.Provider>
  );
};
