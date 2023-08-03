/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { PostList } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PostListUpdateFormInputValues = {
    conttent?: string;
    type?: string;
    sort?: number;
};
export declare type PostListUpdateFormValidationValues = {
    conttent?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    sort?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PostListUpdateFormOverridesProps = {
    PostListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    conttent?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    sort?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PostListUpdateFormProps = React.PropsWithChildren<{
    overrides?: PostListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    postList?: PostList;
    onSubmit?: (fields: PostListUpdateFormInputValues) => PostListUpdateFormInputValues;
    onSuccess?: (fields: PostListUpdateFormInputValues) => void;
    onError?: (fields: PostListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PostListUpdateFormInputValues) => PostListUpdateFormInputValues;
    onValidate?: PostListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PostListUpdateForm(props: PostListUpdateFormProps): React.ReactElement;
