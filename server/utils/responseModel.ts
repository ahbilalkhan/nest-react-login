import {HttpStatus} from "@nestjs/common";

export const responseModel = (result: any) => {
  return {
    data: result,
    message: 'OK',
    status: HttpStatus.OK,
    hasError: false,
  };
};
