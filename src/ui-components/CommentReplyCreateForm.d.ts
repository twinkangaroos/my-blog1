/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CommentReplyCreateFormInputValues = {
    comment_id?: string;
    user_id?: string;
    comment?: string;
    post_id?: string;
};
export declare type CommentReplyCreateFormValidationValues = {
    comment_id?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    comment?: ValidationFunction<string>;
    post_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommentReplyCreateFormOverridesProps = {
    CommentReplyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    comment_id?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    comment?: PrimitiveOverrideProps<TextFieldProps>;
    post_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommentReplyCreateFormProps = React.PropsWithChildren<{
    overrides?: CommentReplyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CommentReplyCreateFormInputValues) => CommentReplyCreateFormInputValues;
    onSuccess?: (fields: CommentReplyCreateFormInputValues) => void;
    onError?: (fields: CommentReplyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommentReplyCreateFormInputValues) => CommentReplyCreateFormInputValues;
    onValidate?: CommentReplyCreateFormValidationValues;
} & React.CSSProperties>;
export default function CommentReplyCreateForm(props: CommentReplyCreateFormProps): React.ReactElement;
