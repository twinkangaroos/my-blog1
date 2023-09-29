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
export declare type RecipeclubCreateFormInputValues = {
    title?: string;
    subtitle?: string;
    main_image?: string;
    ingredient?: string;
    brandsite_url?: string;
    directshop_url?: string;
    amazon_url?: string;
    lohaco_url?: string;
};
export declare type RecipeclubCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    subtitle?: ValidationFunction<string>;
    main_image?: ValidationFunction<string>;
    ingredient?: ValidationFunction<string>;
    brandsite_url?: ValidationFunction<string>;
    directshop_url?: ValidationFunction<string>;
    amazon_url?: ValidationFunction<string>;
    lohaco_url?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecipeclubCreateFormOverridesProps = {
    RecipeclubCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    subtitle?: PrimitiveOverrideProps<TextFieldProps>;
    main_image?: PrimitiveOverrideProps<TextFieldProps>;
    ingredient?: PrimitiveOverrideProps<TextFieldProps>;
    brandsite_url?: PrimitiveOverrideProps<TextFieldProps>;
    directshop_url?: PrimitiveOverrideProps<TextFieldProps>;
    amazon_url?: PrimitiveOverrideProps<TextFieldProps>;
    lohaco_url?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RecipeclubCreateFormProps = React.PropsWithChildren<{
    overrides?: RecipeclubCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RecipeclubCreateFormInputValues) => RecipeclubCreateFormInputValues;
    onSuccess?: (fields: RecipeclubCreateFormInputValues) => void;
    onError?: (fields: RecipeclubCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecipeclubCreateFormInputValues) => RecipeclubCreateFormInputValues;
    onValidate?: RecipeclubCreateFormValidationValues;
} & React.CSSProperties>;
export default function RecipeclubCreateForm(props: RecipeclubCreateFormProps): React.ReactElement;
