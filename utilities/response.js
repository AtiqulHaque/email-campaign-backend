const dayjs = require('dayjs');

const memory_format = (data) => {
    const heap = data / 1024 / 1024;
    return `${Math.round(heap * 100) / 100} MB`;
  };


const data_type_check = (data) => Array.isArray(data) ? [...data] : { ...data };
  

let Response = {
    startTime : dayjs(),

    success : (data,time) => {
        return {
            status : "success",           
            message : "success",
            payload : data,
            diagnostic: {
                request_time: `${time.format("YYYY-MM-DD hh:mm:ss")}`,
                execution_time: `${dayjs().diff(dayjs(time), "millisecond", true)} ms`,
                memory_usage: memory_format(process.memoryUsage().heapUsed),
              }
        }
    },
    successWithMessage : (message,time) => {
        return {
            status : "success",           
            message : message,
            payload : {},
            diagnostic: {
                request_time: `${time.format("YYYY-MM-DD hh:mm:ss")}`,
                execution_time: `${dayjs().diff(dayjs(time), "millisecond", true)} ms`,
                memory_usage: memory_format(process.memoryUsage().heapUsed),
              }
        }
    },
    errorWithMessage : (message,time) => {
        return {
            status : "error",           
            message : message,
            payload : {},
            diagnostic: {
                request_time: `${time.format("YYYY-MM-DD hh:mm:ss")}`,
                execution_time: `${dayjs().diff(dayjs(time), "millisecond", true)} ms`,
                memory_usage: memory_format(process.memoryUsage().heapUsed),
              }
        }
    },
    validationError: (data,time) => {
        return {
            status : "validation-error",           
            message : "validation error",
            payload : data,
            diagnostic: {
                request_time: `${time.format("YYYY-MM-DD hh:mm:ss")}`,
                execution_time: `${dayjs().diff(dayjs(time), "millisecond", true)} ms`,
                memory_usage: memory_format(process.memoryUsage().heapUsed),
              }
        }
    }
}

module.exports = Response;