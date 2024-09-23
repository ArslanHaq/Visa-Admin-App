interface Props {
    text: string;
}
export default function ReactFlowButtonComponent({ text }: Props) {
    return (
        <p className="text-sm font-semibold flex items-center gap-x-2">
            {text}
        </p>
    );
}