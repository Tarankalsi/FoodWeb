

export default function NutriRow({ label, value , unit}: { label: string, value: string , unit : string}) {
    return (
        <tr>
            <td className="border px-4 py-2 capitalize">{label.replace(/-/g, ' ')}</td>
            <td className="border px-4 py-2">{value} {unit}</td>
        </tr>
    );
}
