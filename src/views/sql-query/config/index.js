export const getSchema = (dbOptions = []) => {
  return {
    query: {
      type: 'string',
      enum: dbOptions,
      'x-component': 'DBQuery',
    },
    result: {
      type: 'string',
      'x-component': 'DBTable',
    }
  }
}