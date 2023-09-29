/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Recipeclub } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RecipeclubUpdateFormInputValues = {
    title?: string;
    subtitle?: string;
    main_image?: string;
    ingredient?: string;
};
export declare type RecipeclubUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    subtitle?: ValidationFunction<string>;
    main_image?: ValidationFunction<string>;
    ingredient?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecipeclubUpdateFormOverridesProps = {
    RecipeclubUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    subtitle?: PrimitiveOverrideProps<TextFieldProps>;
    main_image?: PrimitiveOverrideProps<TextFieldProps>;
    ingredient?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RecipeclubUpdateFormProps = React.PropsWithChildren<{
    overrides?: RecipeclubUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    recipeclub?: Recipeclub;
    onSubmit?: (fields: RecipeclubUpdateFormInputValues) => RecipeclubUpdateFormInputValues;
    onSuccess?: (fields: RecipeclubUpdateFormInputValues) => void;
    onError?: (fields: RecipeclubUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecipeclubUpdateFormInputValues) => RecipeclubUpdateFormInputValues;
    onValidate?: RecipeclubUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RecipeclubUpdateForm(props: RecipeclubUpdateFormProps): React.ReactElement;
