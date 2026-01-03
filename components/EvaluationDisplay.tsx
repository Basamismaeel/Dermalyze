'use client'

import { Verdict } from '@prisma/client'

interface EvaluationDisplayProps {
  verdict: Verdict
  goodFor: string[]
  cautionFor: string[]
  notRecommendedFor: string[]
  reasoning: string[]
}

export function EvaluationDisplay({
  verdict,
  goodFor,
  cautionFor,
  notRecommendedFor,
  reasoning,
}: EvaluationDisplayProps) {
  const getVerdictDisplay = () => {
    switch (verdict) {
      case Verdict.SUITABLE:
        return {
          icon: '✅',
          text: 'Generally Suitable',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
        }
      case Verdict.CAUTION:
        return {
          icon: '⚠️',
          text: 'Use with Caution',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
        }
      case Verdict.NOT_RECOMMENDED:
        return {
          icon: '❌',
          text: 'Not Recommended',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
        }
    }
  }

  const verdictDisplay = getVerdictDisplay()

  return (
    <div className="space-y-6">
      {/* Main Verdict */}
      <div
        className={`${verdictDisplay.bgColor} ${verdictDisplay.borderColor} border-2 rounded-lg p-6`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{verdictDisplay.icon}</span>
          <h3 className={`text-xl font-semibold ${verdictDisplay.textColor}`}>
            {verdictDisplay.text}
          </h3>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Based on your skin profile and this product's ingredients
        </p>
      </div>

      {/* Good For */}
      {goodFor.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-green-600">✅</span> Good For
          </h4>
          <ul className="space-y-1">
            {goodFor.map((item, idx) => (
              <li key={idx} className="text-gray-700 flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Caution For */}
      {cautionFor.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-yellow-600">⚠️</span> Caution For
          </h4>
          <ul className="space-y-1">
            {cautionFor.map((item, idx) => (
              <li key={idx} className="text-gray-700 flex items-start gap-2">
                <span className="text-yellow-600 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Not Recommended For */}
      {notRecommendedFor.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-red-600">❌</span> Not Recommended For
          </h4>
          <ul className="space-y-1">
            {notRecommendedFor.map((item, idx) => (
              <li key={idx} className="text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reasoning */}
      {reasoning.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Why this evaluation?
          </h4>
          <ul className="space-y-1">
            {reasoning.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-xs text-yellow-800">
          <strong>Educational purposes only.</strong> This evaluation is based
          on general ingredient information and your profile. Always patch test
          products before full use. Not medical advice.
        </p>
      </div>
    </div>
  )
}

