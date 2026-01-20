import HeaderOptionsButton from "@/components/HeaderOptionsButton";
import { HeaderOption, HeaderOptionsProvider } from "@/contexts/HeaderOptionsContext";
import { Stack } from "expo-router";
import React, { useState } from "react";

export default function StandaloneLayout() {
  const [options, setOptions] = useState<HeaderOption[]>([]);

  return (
    <HeaderOptionsProvider value={{ options, setOptions }}>
      <Stack
        screenOptions={{
          headerRight: () => (options.length ? <HeaderOptionsButton /> : null),
        }}
      />
    </HeaderOptionsProvider>
  );
}
