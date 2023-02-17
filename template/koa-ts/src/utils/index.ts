export const resBuilder = (data: Record<string, any>, code = 1, msg = '') => ({
  code,
  data,
  msg,
});
