/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LikeCreateFormInputValues = {
    post_id?: string;
    user_id?: string;
    like_flag?: boolean;
};
export declare type LikeCreateFormValidationValues = {
    post_id?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    like_flag?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LikeCreateFormOverridesProps = {
    LikeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    post_id?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    like_flag?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type LikeCreateFormProps = React.PropsWithChildren<{
    overrides?: LikeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LikeCreateFormInputValues) => LikeCreateFormInputValues;
    onSuccess?: (fields: LikeCreateFormInputValues) => void;
    onError?: (fields: LikeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LikeCreateFormInputValues) => LikeCreateFormInputValues;
    onValidate?: LikeCreateFormValidationValues;
} & React.CSSProperties>;
export default function LikeCreateForm(props: LikeCreateFormProps): React.ReactElement;
