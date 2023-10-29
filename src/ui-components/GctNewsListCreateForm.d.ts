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
export declare type GctNewsListCreateFormInputValues = {
    content?: string;
    type?: string;
    sort?: number;
    gct_news_id?: string;
};
export declare type GctNewsListCreateFormValidationValues = {
    content?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    sort?: ValidationFunction<number>;
    gct_news_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GctNewsListCreateFormOverridesProps = {
    GctNewsListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    sort?: PrimitiveOverrideProps<TextFieldProps>;
    gct_news_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GctNewsListCreateFormProps = React.PropsWithChildren<{
    overrides?: GctNewsListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GctNewsListCreateFormInputValues) => GctNewsListCreateFormInputValues;
    onSuccess?: (fields: GctNewsListCreateFormInputValues) => void;
    onError?: (fields: GctNewsListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GctNewsListCreateFormInputValues) => GctNewsListCreateFormInputValues;
    onValidate?: GctNewsListCreateFormValidationValues;
} & React.CSSProperties>;
export default function GctNewsListCreateForm(props: GctNewsListCreateFormProps): React.ReactElement;
