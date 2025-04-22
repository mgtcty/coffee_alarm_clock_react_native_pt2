import { Children } from "react";
import { DateProvider } from "@/context/DateContext"
import { DayProvider } from "@/context/DayContext"
import { SanrioCoffeeProvider } from "@/context/SanrioAndCoffeeContext"


export default function CombinedProviders({ children }) {
    return (
      <DateProvider>
        <DayProvider>
          <SanrioCoffeeProvider>
            {children}
          </SanrioCoffeeProvider>
        </DayProvider>
      </DateProvider>
    );
  }