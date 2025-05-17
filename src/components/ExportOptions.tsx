import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Separator } from "../components/ui/separator"
import { FileSpreadsheet, FilePdf, Download } from "lucide-react"
import { useToast } from "../hooks/use-toast"
import { BomItem } from "./BillOfMaterials"

interface ExportOptionsProps {
  bomItems: BomItem[]
  onExport: (format: string, options: any) => void
}

export function ExportOptions({
  bomItems = [],
  onExport,
}: ExportOptionsProps) {
  const { toast } = useToast()
  const [fileName, setFileName] = useState("structural_analysis")
  const [exportFormat, setExportFormat] = useState("excel")
  const [options, setOptions] = useState({
    includeImages: true,
    includeDimensions: true,
    includeWeights: true,
    includeMaterials: true,
    includeNotes: true,
  })

  const handleOptionChange = (option: string) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option as keyof typeof prev],
    }))
  }

  const handleExport = () => {
    // In a real app, this would trigger the actual export process
    // For now, we'll just show a toast message
    toast({
      title: "Export Initiated",
      description: `Exporting to ${
        exportFormat === "excel" ? "Excel" : "PDF"
      } with filename: ${fileName}`,
    })

    if (onExport) {
      onExport(exportFormat, {
        fileName,
        ...options,
      })
    }

    // Mock download by creating a timer
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your file has been exported successfully.",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Export Format</Label>
            <RadioGroup
              defaultValue={exportFormat}
              onValueChange={setExportFormat}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label
                  htmlFor="excel"
                  className="flex cursor-pointer items-center gap-1"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label
                  htmlFor="pdf"
                  className="flex cursor-pointer items-center gap-1"
                >
                  <FilePdf className="h-4 w-4" />
                  PDF
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label>Include in Export</Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeImages"
                checked={options.includeImages}
                onCheckedChange={() => handleOptionChange("includeImages")}
              />
              <Label htmlFor="includeImages" className="cursor-pointer">
                Drawing Images
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeDimensions"
                checked={options.includeDimensions}
                onCheckedChange={() => handleOptionChange("includeDimensions")}
              />
              <Label htmlFor="includeDimensions" className="cursor-pointer">
                Element Dimensions
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeWeights"
                checked={options.includeWeights}
                onCheckedChange={() => handleOptionChange("includeWeights")}
              />
              <Label htmlFor="includeWeights" className="cursor-pointer">
                Weight Calculations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeMaterials"
                checked={options.includeMaterials}
                onCheckedChange={() => handleOptionChange("includeMaterials")}
              />
              <Label htmlFor="includeMaterials" className="cursor-pointer">
                Material Specifications
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeNotes"
                checked={options.includeNotes}
                onCheckedChange={() => handleOptionChange("includeNotes")}
              />
              <Label htmlFor="includeNotes" className="cursor-pointer">
                Notes & Comments
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="pt-2">
          <Button onClick={handleExport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export {bomItems.length} Items
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}