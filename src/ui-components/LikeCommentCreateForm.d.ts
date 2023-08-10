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
export declare type LikeCommentCreateFormInputValues = {
    comment_id?: string;
    user_id?: string;
    like_flag?: string;
    post_id?: string;
};
export declare type LikeCommentCreateFormValidationValues = {
    comment_id?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    like_flag?: ValidationFunction<string>;
    post_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LikeCommentCreateFormOverridesProps = {
    LikeCommentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    comment_id?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    like_flag?: PrimitiveOverrideProps<TextFieldProps>;
    post_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LikeCommentCreateFormProps = React.PropsWithChildren<{
    overrides?: LikeCommentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LikeCommentCreateFormInputValues) => LikeCommentCreateFormInputValues;
    onSuccess?: (fields: LikeCommentCreateFormInputValues) => void;
    onError?: (fields: LikeCommentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LikeCommentCreateFormInputValues) => LikeCommentCreateFormInputValues;
    onValidate?: LikeCommentCreateFormValidationValues;
} & React.CSSProperties>;
export default function LikeCommentCreateForm(props: LikeCommentCreateFormProps): React.ReactElement;
