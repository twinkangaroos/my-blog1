/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GctNewsList } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GctNewsListUpdateFormInputValues = {
    content?: string;
    type?: string;
    sort?: number;
    gct_news_id?: string;
};
export declare type GctNewsListUpdateFormValidationValues = {
    content?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    sort?: ValidationFunction<number>;
    gct_news_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GctNewsListUpdateFormOverridesProps = {
    GctNewsListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    sort?: PrimitiveOverrideProps<TextFieldProps>;
    gct_news_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GctNewsListUpdateFormProps = React.PropsWithChildren<{
    overrides?: GctNewsListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    gctNewsList?: GctNewsList;
    onSubmit?: (fields: GctNewsListUpdateFormInputValues) => GctNewsListUpdateFormInputValues;
    onSuccess?: (fields: GctNewsListUpdateFormInputValues) => void;
    onError?: (fields: GctNewsListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GctNewsListUpdateFormInputValues) => GctNewsListUpdateFormInputValues;
    onValidate?: GctNewsListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GctNewsListUpdateForm(props: GctNewsListUpdateFormProps): React.ReactElement;
