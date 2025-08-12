// backend/validate.js
// Simple validation logic based on the form schema
const formSchema = require("../scraper/scraped-form.json");

function validateForm(data) {
  const errors = {};
  const allFields = [...formSchema.step1, ...formSchema.step2];
  for (const field of allFields) {
    const value = data[field.name];
    if (field.required && !value) {
      errors[field.name] = `${field.label} is required`;
    } else if (field.validation && value && !new RegExp(field.validation.pattern).test(value)) {
      errors[field.name] = field.validation.message;
    }
  }
  return errors;
}

module.exports = { validateForm };
