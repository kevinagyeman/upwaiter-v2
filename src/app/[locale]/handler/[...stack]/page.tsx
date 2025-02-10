import { StackHandler } from '@stackframe/stack';
import { stackServerApp } from '@/stack';

export default function Handler(props: unknown) {
  return (
    <div className='flex flex-col items-center'>
      <StackHandler fullPage={false} app={stackServerApp} routeProps={props} />
    </div>
  );
}
