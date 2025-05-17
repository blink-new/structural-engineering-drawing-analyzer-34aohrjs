import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Upload, BarChart3, FileText, Download } from "lucide-react"
import { useToast } from "./hooks/use-toast"

// Import components
import { FileUpload } from "./components/FileUpload"
import { DrawingViewer } from "./components/DrawingViewer" 
import { BillOfMaterials, BomItem } from "./components/BillOfMaterials"
import { ExportOptions } from "./components/ExportOptions"

interface FileInfo {
  id: string
  name: string
  size: number
  type: string
  url: string
}

interface SteelElement {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

function App() {
  const [activeTab, setActiveTab] = useState("upload")
  const [file, setFile] = useState<FileInfo | null>(null)
  const [elements, setElements] = useState<SteelElement[]>([])
  const [bomItems, setBomItems] = useState<BomItem[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const { toast } = useToast()

  // Mock data generation for demonstration purposes
  const mockElements: SteelElement[] = [
    {
      id: "beam-1",
      type: "I-Beam",
      x: 50,
      y: 100,
      width: 300,
      height: 30,
      color: "rgba(255, 100, 100, 0.5)",
    },
    {
      id: "column-1",
      type: "Column",
      x: 50,
      y: 100,
      width: 40,
      height: 200,
      color: "rgba(100, 100, 255, 0.5)",
    },
    {
      id: "brace-1",
      type: "Brace",
      x: 200,
      y: 200,
      width: 150,
      height: 20,
      color: "rgba(100, 255, 100, 0.5)",
    },
  ]

  const mockBomItems: BomItem[] = [
    {
      id: "bom-1",
      elementId: "beam-1",
      type: "I-Beam",
      size: "W12x26",
      length: 240,
      quantity: 2,
      weight: 520.5,
      material: "A992 Steel",
      notes: "Main floor beam",
    },
    {
      id: "bom-2",
      elementId: "column-1",
      type: "Column",
      size: "HSS6x6x3/8",
      length: 144,
      quantity: 4,
      weight: 432.8,
      material: "A500 Grade B",
      notes: "Corner column",
    },
    {
      id: "bom-3",
      elementId: "brace-1",
      type: "Brace",
      size: "L3x3x1/4",
      length: 180,
      quantity: 8,
      weight: 288.5,
      material: "A36 Steel",
      notes: "Lateral bracing",
    },
  ]

  // Simulate image analysis after file upload
  useEffect(() => {
    if (file) {
      // In a real application, this would be an actual image analysis process
      // For this demo, we'll just simulate it with a timeout
      toast({
        title: "Analyzing Drawing",
        description: "Identifying steel elements in your drawing...",
      })

      setTimeout(() => {
        setElements(mockElements)
        setBomItems(mockBomItems)
        
        toast({
          title: "Analysis Complete",
          description: `Identified ${mockElements.length} steel elements in the drawing.`,
        })
        
        // Automatically switch to the analyze tab after upload
        setActiveTab("analyze")
      }, 2000)
    }
  }, [file, toast])

  const handleFileUpload = (fileInfo: FileInfo) => {
    setFile(fileInfo)
  }

  const handleElementClick = (element: SteelElement) => {
    setSelectedElement(element.id)
    
    toast({
      title: "Element Selected",
      description: `Selected ${element.type} element`,
    })
  }

  const handleViewElement = (elementId: string) => {
    setSelectedElement(elementId)
    setActiveTab("analyze")
  }

  const handleEditBomItem = (updatedItem: BomItem) => {
    setBomItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    )
    
    toast({
      title: "Item Updated",
      description: `Updated ${updatedItem.type} in bill of materials`,
    })
  }

  const handleExport = (format: string, options: any) => {
    // In a real application, this would generate and download the file
    console.log("Exporting format:", format)
    console.log("Export options:", options)
    console.log("BOM items to export:", bomItems)
    
    // Mock Excel generation logic could be implemented here
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <polygon points="2 7 12 2 22 7 22 17 12 22 2 17" />
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
            </div>
            <span className="text-xl font-bold">StructDrawAnalyzer</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="analyze" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analyze</span>
              </TabsTrigger>
              <TabsTrigger value="bom" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">BOM</span>
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Structural Drawing</CardTitle>
                  <CardDescription>
                    Upload your structural engineering drawing to begin analysis.
                    Supported formats: PNG, JPG, PDF.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload onUpload={handleFileUpload} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analyze" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>
                    Identified steel elements are highlighted on the drawing. Click on an element to view details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {file ? (
                    <DrawingViewer
                      imageUrl={file.url}
                      elements={elements}
                      onElementClick={handleElementClick}
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center text-muted-foreground">
                      Please upload a drawing first
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bom" className="space-y-4">
              {bomItems.length > 0 ? (
                <BillOfMaterials
                  items={bomItems}
                  onViewElement={handleViewElement}
                  onEditItem={handleEditBomItem}
                />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Bill of Materials</CardTitle>
                    <CardDescription>
                      No elements have been analyzed yet. Upload a drawing to generate a bill of materials.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex h-64 items-center justify-center text-muted-foreground">
                    Please upload and analyze a drawing first
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="export" className="space-y-4">
              <ExportOptions bomItems={bomItems} onExport={handleExport} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default App