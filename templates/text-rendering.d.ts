import { ReactNode } from 'react';
interface ChildrenProp {
    children: ReactNode;
}
/**
 * Hook for whether we are rendering for text.
 */
export declare const inText: () => boolean;
/**
 * Hide the children of this element when converting to text.
 */
export declare const HideInText: ({ children }: ChildrenProp) => JSX.Element | null;
/**
 * Only show the children of this element when converting to text.
 */
export declare const InText: ({ children }: ChildrenProp) => JSX.Element | null;
export declare const RenderForText: ({ value, children, }: {
    value?: boolean | undefined;
} & ChildrenProp) => JSX.Element;
export {};
