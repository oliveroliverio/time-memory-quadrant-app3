/** @format */

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Event } from '@/types'

export function ExpandedView({
	events,
	onCollapse,
}: {
	events: Event[]
	onCollapse: () => void
}) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className='w-full max-w-5xl'>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
				{events.map((event) => (
					<Card
						key={event.id}
						className='cursor-pointer hover:shadow-lg transition-shadow'>
						<CardContent className='p-4'>
							<h3 className='text-lg font-semibold mb-2'>
								{event.event_entry}
							</h3>
							<p className='text-sm text-gray-600'>
								{new Date(
									event.date_time_created
								).toLocaleString()}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<Button
				onClick={onCollapse}
				className='mt-6 mx-auto block'>
				Collapse
			</Button>
		</motion.div>
	)
}
