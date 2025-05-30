import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Search, SlidersHorizontal } from "lucide-react";
import { isError } from "util";
import { EmptyState } from "../EmptyState";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { ExerciseList } from "./ExerciseList";
import { ExerciseSkeleton } from "./ExerciseSkeleton";
import { useExercises } from "@/hooks/useExercises";
import { useState, useMemo, useEffect } from "react";
const PAGE_SIZE = 9

export default function ExerciseListDialog({
  open,
}: {
  open: boolean;
}) { 
      const { exercises, isLoading, isError } = useExercises();
        const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterType, setFilterType] = useState("all")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
     const filtered = useMemo(() => {
    if (!exercises) return []

    return exercises
      .filter((ex) => {
        const matchesSearch = ex.name.toLowerCase().includes(search.trim().toLowerCase())
        const matchesType = filterType === "all" 
        return matchesSearch && matchesType
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        } 
        return 0
      })
  }, [exercises, search, sortBy, filterType])

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      visibleCount < filtered.length
    ) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length))
    }
  }

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [search, sortBy, filterType, exercises])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [filtered, visibleCount])

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setVisibleCount(PAGE_SIZE)
  }
  return (
   <main>
         <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="mb-4">
        Ver Exercícios
      </Button>
    </DialogTrigger>
    <DialogContent>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Exercícios</CardTitle>
          <CardDescription>Explore nossa biblioteca de exercícios gratuitos para seu treino</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={setFilterType}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList className="mb-2 md:mb-0">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="strength">Força</TabsTrigger>
                <TabsTrigger value="cardio">Cardio</TabsTrigger>
                <TabsTrigger value="flexibility">Flexibilidade</TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar exercícios..."
                    value={search}
                    onChange={onSearchChange}
                    className="pl-8 w-full sm:w-[250px]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nome (A-Z)</SelectItem>
                      <SelectItem value="difficulty">Dificuldade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <ExerciseSkeleton count={PAGE_SIZE} />
              ) : isError ? (
                <div className="rounded-lg border p-8 text-center">
                  <p className="text-lg font-medium">Erro ao carregar exercícios</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ocorreu um erro ao carregar os exercícios. Por favor, tente novamente mais tarde.
                  </p>
                  <Button className="mt-4" onClick={() => window.location.reload()}>
                    Tentar novamente
                  </Button>
                </div>
              ) : filtered.slice(0, visibleCount).length === 0 ? (
                <EmptyState
                  title="Nenhum exercício encontrado"
                  description="Tente ajustar seus filtros ou busca para encontrar exercícios."
                  action={
                    <Button
                      onClick={() => {
                        setSearch("")
                        setFilterType("all")
                        setSortBy("name")
                      }}
                    >
                      Limpar filtros
                    </Button>
                  }
                />
              ) : (
                <ExerciseList exercises={filtered.slice(0, visibleCount)} />
              )}
            </TabsContent>

            {["strength", "cardio", "flexibility"].map((type) => (
              <TabsContent key={type} value={type} className="mt-0">
                {isLoading ? (
                  <ExerciseSkeleton count={PAGE_SIZE} />
                ) : isError ? (
                  <div className="rounded-lg border p-8 text-center">
                    <p className="text-lg font-medium">Erro ao carregar exercícios</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Ocorreu um erro ao carregar os exercícios. Por favor, tente novamente mais tarde.
                    </p>
                    <Button className="mt-4" onClick={() => window.location.reload()}>
                      Tentar novamente
                    </Button>
                  </div>
                ) : filtered.slice(0, visibleCount).length === 0 ? (
                  <EmptyState
                    title="Nenhum exercício encontrado"
                    description="Tente ajustar seus filtros ou busca para encontrar exercícios."
                    action={
                      <Button
                        onClick={() => {
                          setSearch("")
                          setSortBy("name")
                        }}
                      >
                        Limpar busca
                      </Button>
                    }
                  />
                ) : (
                  <ExerciseList exercises={filtered.slice(0, visibleCount)} />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      </DialogContent>
    </Dialog>
   </main>
  );
}