import React from 'react'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Exercise } from '../../types/exercise'

const BASE_IMG_PATH = '/exercises'

type Props = { exercise: Exercise }

export function ExerciseCard({ exercise: ex }: Props) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{ex.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <p><strong>Categoria:</strong> {ex.category}</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {ex.images.map(img => (
            <div key={img} className="relative w-full h-24">
              <Image
                src={`${BASE_IMG_PATH}/${img}`}
                alt={ex.name}
                fill
                style={{ objectFit: 'contain', borderRadius: '0.5rem' }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
