import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
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
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Structural Engineering Drawing Analyzer</h1>
            
            <div className="grid gap-4 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Upload Drawing</h2>
                  <p className="text-gray-600 mb-4">
                    Upload your structural engineering drawing to begin analysis.
                    Supported formats: PNG, JPG, PDF.
                  </p>
                  
                  <div className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors border-gray-300 hover:border-blue-500 hover:bg-blue-50">
                    <div className="flex flex-col items-center justify-center space-y-2 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-gray-400">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <h3 className="text-lg font-medium">
                        Drag & drop your drawing here
                      </h3>
                      <p className="text-sm text-gray-500">
                        Upload structural engineering drawings (PNG, JPG, PDF)
                      </p>
                      <button className="mt-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                        Browse Files
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Analysis Features</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <line x1="12" y1="2" x2="12" y2="6"></line>
                          <line x1="12" y1="18" x2="12" y2="22"></line>
                          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                          <line x1="2" y1="12" x2="6" y2="12"></line>
                          <line x1="18" y1="12" x2="22" y2="12"></line>
                          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Element Detection</h3>
                        <p className="text-sm text-gray-500">Automatically detects steel elements in drawings</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                          <rect x="9" y="9" width="6" height="6"></rect>
                          <line x1="9" y1="2" x2="9" y2="4"></line>
                          <line x1="15" y1="2" x2="15" y2="4"></line>
                          <line x1="9" y1="20" x2="9" y2="22"></line>
                          <line x1="15" y1="20" x2="15" y2="22"></line>
                          <line x1="20" y1="9" x2="22" y2="9"></line>
                          <line x1="20" y1="14" x2="22" y2="14"></line>
                          <line x1="2" y1="9" x2="4" y2="9"></line>
                          <line x1="2" y1="14" x2="4" y2="14"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Interactive Highlighting</h3>
                        <p className="text-sm text-gray-500">Visualize and interact with detected elements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Bill of Materials</h3>
                        <p className="text-sm text-gray-500">Generate comprehensive material lists</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-orange-100 p-2 text-orange-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Excel Export</h3>
                        <p className="text-sm text-gray-500">Export analysis results to Excel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Start by uploading a structural engineering drawing to begin analysis.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App