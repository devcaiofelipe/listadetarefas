export default function phoneCodeGenerator() {
  return Math.random().toString(36).slice(-6).toUpperCase();
};
