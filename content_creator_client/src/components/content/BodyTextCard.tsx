import parse from 'html-react-parser'

interface BodyTextCardProps {
  bodyText?: string
}

const BodyTextCard: React.FC<BodyTextCardProps> = ({ bodyText }) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <div className="text-lg text-gray-700">
        {bodyText ? parse(bodyText) : ''}
      </div>
    </div>
  )
}

export default BodyTextCard
