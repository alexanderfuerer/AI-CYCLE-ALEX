import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Sparkles, FileText, BarChart3 } from 'lucide-react'
import { useEmployee, useEmployeeMutations } from '../hooks'
import { useStyleProfile, useStyleAnalysis } from '../hooks/useStyleProfile'
import { Button, Input, Textarea, Card, CardBody, CardHeader, Badge } from '../components/ui'
import type { EmployeeFormData } from '../types'

export function EmployeeSetupPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const { employee, loading: loadingEmployee } = useEmployee(isNew ? undefined : id)
  const { styleProfile, loading: loadingProfile, refetch: refetchProfile } = useStyleProfile(isNew ? undefined : id)
  const { create, update, uploadSamples, loading: saving, error: saveError } = useEmployeeMutations()
  const { analyze, analyzing, error: analysisError } = useStyleAnalysis()

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    email: '',
    linkedinProfile: '',
    googleDriveFolderId: '',
    toneDescription: '',
  })

  const [sampleTexts, setSampleTexts] = useState('')
  const [sampleFile, setSampleFile] = useState<File | null>(null)

  // Populate form when employee loads
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        linkedinProfile: employee.linkedinProfile,
        googleDriveFolderId: employee.googleDriveFolderId,
        toneDescription: employee.toneDescription,
      })
    }
  }, [employee])

  const handleChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSampleFile(file)

    // Read file content
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setSampleTexts(text)
    }
    reader.readAsText(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isNew) {
      const newId = await create(formData)
      if (newId) {
        // Upload sample texts if provided
        if (sampleFile) {
          await uploadSamples(newId, sampleFile)
        }
        navigate(`/employees/${newId}`)
      }
    } else if (id) {
      const success = await update(id, formData)
      if (success && sampleFile) {
        await uploadSamples(id, sampleFile)
      }
    }
  }

  const handleAnalyze = async () => {
    if (!id || !sampleTexts.trim()) return

    const profile = await analyze(id, sampleTexts)
    if (profile) {
      refetchProfile()
    }
  }

  const loading = loadingEmployee || loadingProfile
  const error = saveError || analysisError

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/employees')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'Neuer Mitarbeiter' : 'Mitarbeiter bearbeiten'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isNew ? 'Lege einen neuen Mitarbeiter an' : `Bearbeite ${employee?.name || ''}`}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Grunddaten</h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(v) => handleChange('name', v)}
                  placeholder="Max Mustermann"
                  required
                />

                <Input
                  label="E-Mail"
                  type="email"
                  value={formData.email}
                  onChange={(v) => handleChange('email', v)}
                  placeholder="max@example.com"
                  required
                />

                <Input
                  label="LinkedIn Profil URL"
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={(v) => handleChange('linkedinProfile', v)}
                  placeholder="https://linkedin.com/in/..."
                />

                <Input
                  label="Google Drive Folder ID"
                  value={formData.googleDriveFolderId}
                  onChange={(v) => handleChange('googleDriveFolderId', v)}
                  placeholder="1ABC..."
                />

                <Textarea
                  label="Tone of Voice Beschreibung"
                  value={formData.toneDescription}
                  onChange={(v) => handleChange('toneDescription', v)}
                  placeholder="Beschreibe den allgemeinen Schreibstil und die Tonalität..."
                  rows={4}
                />

                <div className="pt-4">
                  <Button type="submit" loading={saving}>
                    {isNew ? 'Anlegen' : 'Speichern'}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>

          {/* Sample Texts Upload */}
          {!isNew && (
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Mustertexte</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Textdatei hochladen (.txt)
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">Datei wählen</span>
                        <input
                          type="file"
                          accept=".txt"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      {sampleFile && (
                        <span className="text-sm text-gray-500">
                          {sampleFile.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Oder Text direkt eingeben
                    </label>
                    <Textarea
                      value={sampleTexts}
                      onChange={setSampleTexts}
                      placeholder="Füge hier Beispiel-LinkedIn-Posts ein (durch Leerzeilen getrennt)..."
                      rows={8}
                    />
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    disabled={!sampleTexts.trim()}
                    loading={analyzing}
                    variant="secondary"
                  >
                    <Sparkles className="w-4 h-4" />
                    Stilanalyse durchführen
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Right Column - Style Profile */}
        {!isNew && (
          <div className="space-y-6">
            {loadingProfile ? (
              <Card>
                <CardBody>
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </CardBody>
              </Card>
            ) : styleProfile ? (
              <>
                {/* Quantitative Profile */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary-600" />
                      <h2 className="font-semibold text-gray-900">Quantitative Analyse</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Wörter/Post:</span>
                        <span className="ml-2 font-medium">
                          {styleProfile.quantitative.avgWordsPerPost}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Wörter/Satz:</span>
                        <span className="ml-2 font-medium">
                          {styleProfile.quantitative.avgWordsPerSentence}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Emojis/Post:</span>
                        <span className="ml-2 font-medium">
                          {styleProfile.quantitative.avgEmojisPerPost}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Absätze:</span>
                        <span className="ml-2 font-medium">
                          {styleProfile.quantitative.avgParagraphBreaksPerPost}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2">Top Emojis:</p>
                      <div className="flex gap-2">
                        {styleProfile.quantitative.topEmojis.map((emoji, i) => (
                          <span key={i} className="text-xl">{emoji}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2">Top Wörter:</p>
                      <div className="flex flex-wrap gap-2">
                        {styleProfile.quantitative.topWords.slice(0, 8).map((word, i) => (
                          <Badge key={i} variant="default">{word}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2">Satzlängen-Verteilung:</p>
                      <div className="space-y-2">
                        {[
                          { label: '1-3 Wörter', value: styleProfile.quantitative.sentenceLengthDistribution.under3Words },
                          { label: '4-8 Wörter', value: styleProfile.quantitative.sentenceLengthDistribution.words4to8 },
                          { label: '9-15 Wörter', value: styleProfile.quantitative.sentenceLengthDistribution.words9to15 },
                          { label: '16-25 Wörter', value: styleProfile.quantitative.sentenceLengthDistribution.words16to25 },
                          { label: '26+ Wörter', value: styleProfile.quantitative.sentenceLengthDistribution.over25Words },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-20">{label}</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-500 rounded-full"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium w-10 text-right">{value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Qualitative Profile */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <h2 className="font-semibold text-gray-900">Qualitative Analyse</h2>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Tonalität</p>
                        <p className="text-sm text-gray-600">{styleProfile.qualitative.tonality}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Rhythmus & Struktur</p>
                        <p className="text-sm text-gray-600">{styleProfile.qualitative.rhythm}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Kommunikationsstil</p>
                        <p className="text-sm text-gray-600">{styleProfile.qualitative.communicationStyle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Beliefs & Werte</p>
                        <p className="text-sm text-gray-600">{styleProfile.qualitative.beliefs}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </>
            ) : (
              <Card>
                <CardBody>
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Kein Stilprofil</h3>
                    <p className="text-sm text-gray-500">
                      Lade Mustertexte hoch und führe eine Stilanalyse durch.
                    </p>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
