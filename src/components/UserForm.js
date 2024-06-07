import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './FormValidate.css';

const FormValidate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    countryCode: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one digit';
    }

    if (!formData.phoneNo.trim()) newErrors.phoneNo = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';

    // PAN number validation
    if (!formData.panNo.trim()) {
      newErrors.panNo = 'PAN number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo.trim().toUpperCase())) {
      newErrors.panNo = 'PAN number is invalid';
    }

    // Aadhaar number validation
    if (!formData.aadharNo.trim()) {
      newErrors.aadharNo = 'Aadhaar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNo.trim())) {
      newErrors.aadharNo = 'Aadhaar number should be 12 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: { formData } });
    }
  };

  const countries = [
    { name: 'United States', code: '+1', cities: ['New York', 'Los Angeles', 'Chicago'] },
    { name: 'Canada', code: '+1', cities: ['Toronto', 'Vancouver', 'Montreal'] },
    { name: 'United Kingdom', code: '+44', cities: ['London', 'Manchester', 'Birmingham'] },
    { name: 'Australia', code: '+61', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
    { name: 'Germany', code: '+49', cities: ['Berlin', 'Munich', 'Hamburg'] },
    { name: 'France', code: '+33', cities: ['Paris', 'Marseille', 'Lyon'] },
    { name: 'Japan', code: '+81', cities: ['Tokyo', 'Osaka', 'Kyoto'] },
    { name: 'India', code: '+91', cities: ['Mumbai', 'Delhi', 'Bangalore'] },
    { name: 'Brazil', code: '+55', cities: ['Sao Paulo', 'Rio de Janeiro', 'Brasilia'] },
    { name: 'Mexico', code: '+52', cities: ['Mexico City', 'Guadalajara', 'Monterrey'] },
  ];

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"} // Show/hide password
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="show-hide-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number (Country Code ____ Number)</label>
          <div className="phone-input">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
            >
              <option value="">Select Country Code</option>
              {countries.map((country) => (
                <option key={country.name} value={country.code}>
                  {`${country.name} (${country.code})`}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
          {errors.phoneNo && <span className="error">{errors.phoneNo}</span>}
        </div>
        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <div className="form-group">
          <label>City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">Select City</option>
            {formData.country && countries
              .find((country) => country.name === formData.country)
              ?.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label>PAN Number</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
          />
          {errors.panNo && <span className="error">{errors.panNo}</span>}
        </div>
        <div className="form-group">
          <label>Aadhaar Number</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
          />
          {errors.aadharNo && <span className="error">{errors.aadharNo}</span>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormValidate;
