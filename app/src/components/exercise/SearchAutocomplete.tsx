"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"

interface SearchAutocompleteProps {
  dataset: { id: string; name: string }[]
  onSelect: (item: { id: string; name: string }) => void
}

export function SearchAutocomplete({ dataset, onSelect }: SearchAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query) return dataset
    return dataset.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [dataset, query])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {query ? `Buscar: ${query}` : "Buscar exercício..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            autoFocus
            placeholder="Digite para buscar..."
            value={query}
            onValueChange={value => setQuery(value)}
          />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup>
              {filtered.map(item => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onSelect(item)
                    setOpen(false)
                    setQuery("")
                  }}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
