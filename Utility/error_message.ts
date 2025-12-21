/* eslint-disable @typescript-eslint/no-explicit-any */
const UNKNOWN_ERROR = {
  success: false,
  message: "Unknown Error",
  data: null,
};

const MISSING_REQUIREMENT = {
  success: false,
  message: "Some requirement are missing ",
  data: null,
};

const TASK_FAILED = (error: Error) => {
  return {
    success: false,
    message: "error:" + error,
    data: error,
  };
};

const TASK_COMPLETE = (data: any) => {
  return {
    success: true,
    message: "Task completed successfully",
    data: data,
  };
};

export { UNKNOWN_ERROR, MISSING_REQUIREMENT, TASK_COMPLETE, TASK_FAILED };
