import parse from 'html-react-parser'

interface BodyTextCardProps {
  bodyText?: string
}

const BodyTextCard: React.FC<BodyTextCardProps> = ({ bodyText }) => {

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <div className="text-lg text-gray-700 prose prose-lg max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
        {bodyText ? parse(bodyText) : ''}
      </div>
    </div>
  )
}

export default BodyTextCard
