'use client'

import { useState } from 'react'

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  coverageType: '',
  insuranceCoverage: '',
  householdIncome: '',
}

export default function AppointmentForm({ form }) {
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({
      loading: true,
      error: '',
      success: '',
    })

    try {
      const response = await fetch('/api/saveToGoogleSheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || form.error)
      }

      setFormData(initialFormData)
      setStatus({
        loading: false,
        error: '',
        success: form.success,
      })
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message || form.error,
        success: '',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="row gy-3">
        <div className="col-md-6">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder={form.firstName}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder={form.lastName}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder={form.email}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder={form.phone}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="zipCode"
            className="form-control"
            placeholder={form.zipCode}
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder={form.address}
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder={form.city}
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <select
            name="state"
            className="form-select"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">{form.statePlaceholder}</option>
            {form.stateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            name="coverageType"
            className="form-select"
            value={formData.coverageType}
            onChange={handleChange}
            required
          >
            <option value="">{form.coverageTypePlaceholder}</option>
            {form.coverageTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            name="insuranceCoverage"
            className="form-select"
            value={formData.insuranceCoverage}
            onChange={handleChange}
            required
          >
            <option value="">{form.insuranceCoveragePlaceholder}</option>
            {form.insuranceCoverageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <select
            name="householdIncome"
            className="form-select"
            value={formData.householdIncome}
            onChange={handleChange}
            required
          >
            <option value="">{form.householdIncomePlaceholder}</option>
            {form.householdIncomeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          {status.loading ? <div className="loading d-block">{form.loading}</div> : null}
          {status.error ? <div className="error-message d-block">{status.error}</div> : null}
          {status.success ? <div className="sent-message d-block">{status.success}</div> : null}
          <button type="submit" className="btn btn-appointment w-100" disabled={status.loading}>
            <i className="bi bi-calendar-plus me-2"></i>
            {status.loading ? form.submitting : form.submit}
          </button>
        </div>
      </div>
    </form>
  )
}
