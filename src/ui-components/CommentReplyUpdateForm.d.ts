/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CommentReply } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CommentReplyUpdateFormInputValues = {
    comment_id?: string;
    user_id?: string;
    comment_body?: string;
    post_id?: string;
};
export declare type CommentReplyUpdateFormValidationValues = {
    comment_id?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    comment_body?: ValidationFunction<string>;
    post_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommentReplyUpdateFormOverridesProps = {
    CommentReplyUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    comment_id?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    comment_body?: PrimitiveOverrideProps<TextFieldProps>;
    post_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommentReplyUpdateFormProps = React.PropsWithChildren<{
    overrides?: CommentReplyUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    commentReply?: CommentReply;
    onSubmit?: (fields: CommentReplyUpdateFormInputValues) => CommentReplyUpdateFormInputValues;
    onSuccess?: (fields: CommentReplyUpdateFormInputValues) => void;
    onError?: (fields: CommentReplyUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommentReplyUpdateFormInputValues) => CommentReplyUpdateFormInputValues;
    onValidate?: CommentReplyUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CommentReplyUpdateForm(props: CommentReplyUpdateFormProps): React.ReactElement;
