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
export declare type GctNewsCreateFormInputValues = {
    title?: string;
    article_type?: string;
    show_date?: string;
};
export declare type GctNewsCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    article_type?: ValidationFunction<string>;
    show_date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GctNewsCreateFormOverridesProps = {
    GctNewsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    article_type?: PrimitiveOverrideProps<TextFieldProps>;
    show_date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GctNewsCreateFormProps = React.PropsWithChildren<{
    overrides?: GctNewsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GctNewsCreateFormInputValues) => GctNewsCreateFormInputValues;
    onSuccess?: (fields: GctNewsCreateFormInputValues) => void;
    onError?: (fields: GctNewsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GctNewsCreateFormInputValues) => GctNewsCreateFormInputValues;
    onValidate?: GctNewsCreateFormValidationValues;
} & React.CSSProperties>;
export default function GctNewsCreateForm(props: GctNewsCreateFormProps): React.ReactElement;
