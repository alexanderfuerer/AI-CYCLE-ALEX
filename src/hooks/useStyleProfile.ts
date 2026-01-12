import { useState, useEffect, useCallback } from 'react'
import type { StyleProfile } from '../types'
import { getStyleProfile, saveStyleProfile } from '../services/firestoreService'
import { analyzeStyle } from '../services/claudeService'

export function useStyleProfile(employeeId: string | undefined) {
  const [styleProfile, setStyleProfile] = useState<StyleProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStyleProfile = useCallback(async () => {
    if (!employeeId) {
      setStyleProfile(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getStyleProfile(employeeId)
      setStyleProfile(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch style profile')
    } finally {
      setLoading(false)
    }
  }, [employeeId])

  useEffect(() => {
    fetchStyleProfile()
  }, [fetchStyleProfile])

  return {
    styleProfile,
    loading,
    error,
    refetch: fetchStyleProfile,
  }
}

export function useStyleAnalysis() {
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyze = async (
    employeeId: string,
    sampleTexts: string
  ): Promise<StyleProfile | null> => {
    try {
      setAnalyzing(true)
      setError(null)

      // Analyze with Claude
      const result = await analyzeStyle(sampleTexts)

      // Save to Firestore
      await saveStyleProfile(
        employeeId,
        result.quantitative,
        result.qualitative
      )

      // Fetch the saved profile
      const profile = await getStyleProfile(employeeId)
      return profile
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze style')
      return null
    } finally {
      setAnalyzing(false)
    }
  }

  return {
    analyze,
    analyzing,
    error,
  }
}
