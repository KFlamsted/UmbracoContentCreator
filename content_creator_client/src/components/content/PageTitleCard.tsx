interface PageTitleCardProps {
  title?: string
}

const PageTitleCard: React.FC<PageTitleCardProps> = ({ title }) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        {title}
      </h1>
    </div>
  )
}

export default PageTitleCard
