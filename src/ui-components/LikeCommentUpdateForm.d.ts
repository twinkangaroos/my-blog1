/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { LikeComment } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LikeCommentUpdateFormInputValues = {
    comment_id?: string;
    user_id?: string;
    like_flag?: boolean;
    post_id?: string;
};
export declare type LikeCommentUpdateFormValidationValues = {
    comment_id?: ValidationFunction<string>;
    user_id?: ValidationFunction<string>;
    like_flag?: ValidationFunction<boolean>;
    post_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LikeCommentUpdateFormOverridesProps = {
    LikeCommentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    comment_id?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
    like_flag?: PrimitiveOverrideProps<SwitchFieldProps>;
    post_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LikeCommentUpdateFormProps = React.PropsWithChildren<{
    overrides?: LikeCommentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    likeComment?: LikeComment;
    onSubmit?: (fields: LikeCommentUpdateFormInputValues) => LikeCommentUpdateFormInputValues;
    onSuccess?: (fields: LikeCommentUpdateFormInputValues) => void;
    onError?: (fields: LikeCommentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LikeCommentUpdateFormInputValues) => LikeCommentUpdateFormInputValues;
    onValidate?: LikeCommentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LikeCommentUpdateForm(props: LikeCommentUpdateFormProps): React.ReactElement;
