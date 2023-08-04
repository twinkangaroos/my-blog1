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
export declare type PostListCreateFormInputValues = {
    content?: string;
    type?: string;
    sort?: number;
    post_id?: string;
};
export declare type PostListCreateFormValidationValues = {
    content?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    sort?: ValidationFunction<number>;
    post_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostListCreateFormOverridesProps = {
    PostListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    sort?: PrimitiveOverrideProps<TextFieldProps>;
    post_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostListCreateFormProps = React.PropsWithChildren<{
    overrides?: PostListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PostListCreateFormInputValues) => PostListCreateFormInputValues;
    onSuccess?: (fields: PostListCreateFormInputValues) => void;
    onError?: (fields: PostListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostListCreateFormInputValues) => PostListCreateFormInputValues;
    onValidate?: PostListCreateFormValidationValues;
} & React.CSSProperties>;
export default function PostListCreateForm(props: PostListCreateFormProps): React.ReactElement;
