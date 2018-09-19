export default function() {
    return {
        visitor: {
            Program: {
                enter() {
                    console.log('Program Entered!');
                },
                exit() {
                    console.log('Program Exited!');
                },
            },
        },
    };
}
