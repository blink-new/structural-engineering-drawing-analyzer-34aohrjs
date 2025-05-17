import { useState, useEffect, useRef } from "react"
import { ZoomIn, ZoomOut, Move, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"

interface SteelElement {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

interface DrawingViewerProps {
  imageUrl: string
  elements?: SteelElement[]
  onElementClick?: (element: SteelElement) => void
}

export function DrawingViewer({
  imageUrl,
  elements = [],
  onElementClick,
}: DrawingViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [showElements, setShowElements] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Mock elements for demonstration
  const mockElements: SteelElement[] = [
    {
      id: "beam-1",
      type: "I-Beam",
      x: 20,
      y: 20,
      width: 200,
      height: 50,
      color: "rgba(255, 100, 100, 0.5)",
    },
    {
      id: "column-1",
      type: "Column",
      x: 250,
      y: 30,
      width: 50,
      height: 200,
      color: "rgba(100, 100, 255, 0.5)",
    },
    {
      id: "brace-1",
      type: "Brace",
      x: 350,
      y: 150,
      width: 150,
      height: 20,
      color: "rgba(100, 255, 100, 0.5)",
    },
  ]

  const allElements = elements.length > 0 ? elements : mockElements

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPosition({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleElementClick = (element: SteelElement) => {
    if (onElementClick) {
      onElementClick(element)
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.1 : 0.1
        setZoom((prev) => Math.max(0.5, Math.min(prev + delta, 3)))
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <div className="flex w-32 items-center gap-2">
            <Slider
              value={[zoom * 100]}
              min={50}
              max={300}
              step={10}
              onValueChange={(value) => setZoom(value[0] / 100)}
            />
            <span className="text-xs text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>
          </div>
        </div>
        <Toggle
          pressed={showElements}
          onPressedChange={setShowElements}
          title="Toggle Elements"
        >
          <Layers className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Elements</span>
        </Toggle>
      </div>
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className="relative h-[500px] overflow-hidden bg-muted/30"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div
            className="absolute transition-transform duration-100 ease-linear"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: "0 0",
            }}
          >
            <img src={imageUrl} alt="Engineering Drawing" />
            {showElements &&
              allElements.map((element) => (
                <div
                  key={element.id}
                  className="absolute cursor-pointer border-2 border-primary font-bold transition-colors hover:bg-opacity-70"
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    backgroundColor: element.color,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleElementClick(element)
                  }}
                />
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}