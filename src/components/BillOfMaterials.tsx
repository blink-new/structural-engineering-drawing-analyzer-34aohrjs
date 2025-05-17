import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Search, Eye, Download, Edit2, Check } from "lucide-react"

export interface BomItem {
  id: string
  elementId: string
  type: string
  size: string
  length: number
  quantity: number
  weight: number
  material: string
  notes: string
}

interface BillOfMaterialsProps {
  items: BomItem[]
  onViewElement?: (elementId: string) => void
  onEditItem?: (item: BomItem) => void
}

export function BillOfMaterials({
  items = [],
  onViewElement,
  onEditItem,
}: BillOfMaterialsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<BomItem>>({})

  // Mock data for demonstration
  const mockItems: BomItem[] = [
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

  const allItems = items.length > 0 ? items : mockItems

  const filteredItems = allItems.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.type.toLowerCase().includes(searchLower) ||
      item.size.toLowerCase().includes(searchLower) ||
      item.material.toLowerCase().includes(searchLower) ||
      item.notes.toLowerCase().includes(searchLower)
    )
  })

  const handleViewElement = (elementId: string) => {
    if (onViewElement) {
      onViewElement(elementId)
    }
  }

  const startEdit = (item: BomItem) => {
    setEditingItemId(item.id)
    setEditValues(item)
  }

  const saveEdit = (item: BomItem) => {
    if (onEditItem && editValues) {
      onEditItem({ ...item, ...editValues })
    }
    setEditingItemId(null)
    setEditValues({})
  }

  const handleEditChange = (field: keyof BomItem, value: any) => {
    setEditValues((prev) => ({ ...prev, [field]: value }))
  }

  const totalWeight = filteredItems.reduce(
    (sum, item) => sum + item.weight,
    0
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bill of Materials</CardTitle>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Length (in)</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Weight (lb)</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No items found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      {editingItemId === item.id ? (
                        <Input
                          value={editValues.size || item.size}
                          onChange={(e) =>
                            handleEditChange("size", e.target.value)
                          }
                          className="h-8 w-full"
                        />
                      ) : (
                        item.size
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingItemId === item.id ? (
                        <Input
                          type="number"
                          value={editValues.length || item.length}
                          onChange={(e) =>
                            handleEditChange("length", Number(e.target.value))
                          }
                          className="h-8 w-full text-right"
                        />
                      ) : (
                        item.length
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingItemId === item.id ? (
                        <Input
                          type="number"
                          value={editValues.quantity || item.quantity}
                          onChange={(e) =>
                            handleEditChange("quantity", Number(e.target.value))
                          }
                          className="h-8 w-full text-right"
                        />
                      ) : (
                        item.quantity
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.weight.toFixed(1)}
                    </TableCell>
                    <TableCell>
                      {editingItemId === item.id ? (
                        <Input
                          value={editValues.material || item.material}
                          onChange={(e) =>
                            handleEditChange("material", e.target.value)
                          }
                          className="h-8 w-full"
                        />
                      ) : (
                        item.material
                      )}
                    </TableCell>
                    <TableCell>
                      {editingItemId === item.id ? (
                        <Input
                          value={editValues.notes || item.notes}
                          onChange={(e) =>
                            handleEditChange("notes", e.target.value)
                          }
                          className="h-8 w-full"
                        />
                      ) : (
                        item.notes
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {editingItemId === item.id ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => saveEdit(item)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewElement(item.elementId)}
                              title="View in Drawing"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => startEdit(item)}
                              title="Edit Item"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Showing {filteredItems.length} of {allItems.length} items
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              Total Weight: {totalWeight.toFixed(1)} lb
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}