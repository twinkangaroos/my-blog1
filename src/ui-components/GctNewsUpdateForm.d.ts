/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GctNews } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GctNewsUpdateFormInputValues = {
    title?: string;
    article_type?: string;
    show_date?: string;
};
export declare type GctNewsUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    article_type?: ValidationFunction<string>;
    show_date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GctNewsUpdateFormOverridesProps = {
    GctNewsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    article_type?: PrimitiveOverrideProps<TextFieldProps>;
    show_date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GctNewsUpdateFormProps = React.PropsWithChildren<{
    overrides?: GctNewsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    gctNews?: GctNews;
    onSubmit?: (fields: GctNewsUpdateFormInputValues) => GctNewsUpdateFormInputValues;
    onSuccess?: (fields: GctNewsUpdateFormInputValues) => void;
    onError?: (fields: GctNewsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GctNewsUpdateFormInputValues) => GctNewsUpdateFormInputValues;
    onValidate?: GctNewsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GctNewsUpdateForm(props: GctNewsUpdateFormProps): React.ReactElement;
