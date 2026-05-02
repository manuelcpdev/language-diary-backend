type Error = {
    isError: boolean,
    type: string,
    message: string,
    messageDev: string | undefined
}
export function getError(error: unknown) {
    let errorObj: Error = {
        isError: false,
        type: "unknown",
        message: "An unknown error has occurred",
        messageDev: "Check the logs"
    }
    if (error instanceof Error) {
        errorObj = {
            isError: true,
            type: error.name,
            message: error.message,
            messageDev: error.stack
        }

        switch (errorObj.type) {
            case 'SqlError':
                errorObj.message = 'A SQL error has occurred';
                break;
        }
    }
    return errorObj;
}